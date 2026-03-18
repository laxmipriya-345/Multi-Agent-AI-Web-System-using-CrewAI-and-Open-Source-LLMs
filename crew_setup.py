from crewai import Crew, Process
from agents.analyzer import AnalyzerAgent
from agents.generator import GeneratorAgent
from agents.evaluator import EvaluatorAgent
import json

def run_crew(user_message, history=None):
    try:
        # Initialize agents
        analyzer = AnalyzerAgent()
        generator = GeneratorAgent()
        evaluator = EvaluatorAgent()
        
        # Step 1: Analyze the query
        print("🤔 Analyzer Agent working...")
        analysis_result = analyzer.analyze_query(user_message, history)
        
        # Step 2: Generate solution
        print("💡 Generator Agent working...")
        solution_result = generator.generate_solution(analysis_result, history)
        
        # Step 3: Evaluate and refine
        print("✅ Evaluator Agent working...")
        final_result = evaluator.evaluate_solution(solution_result, user_message)
        
        # Parse and combine results
        try:
            # Try to parse as JSON if possible
            evaluation_data = json.loads(final_result)
            final_response = evaluation_data.get('final_refined_response', final_result)
        except:
            final_response = final_result
        
        return final_response
        
    except Exception as e:
        return f"Error in crew execution: {str(e)}"