from crewai import Agent
import os

class EvaluatorAgent:
    def __init__(self):
        self.agent = Agent(
            role='Quality Evaluator',
            goal='Evaluate and refine generated solutions for accuracy and completeness',
            backstory="""You are a meticulous quality assurance expert who reviews 
            solutions for accuracy, completeness, and clarity. You ensure that 
            responses meet the highest standards.""",
            verbose=True,
            allow_delegation=False,
            llm_config={
                'model': os.getenv('LLM_MODEL', 'gpt-3.5-turbo'),
                'temperature': 0.2
            }
        )
    
    def evaluate_solution(self, solution, original_query):
        task_description = f"""
        Evaluate the following solution for quality and completeness:
        
        Original Query: {original_query}
        
        Generated Solution: {solution}
        
        Evaluate based on:
        1. Accuracy (is the information correct?)
        2. Completeness (does it address all aspects?)
        3. Clarity (is it easy to understand?)
        4. Relevance (does it match the query?)
        5. Actionability (can user implement it?)
        
        Provide:
        1. Quality score (0-100)
        2. Specific improvements needed
        3. Final refined response
        """
        
        return self.agent.execute(task_description)