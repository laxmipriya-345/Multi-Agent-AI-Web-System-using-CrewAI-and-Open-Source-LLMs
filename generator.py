from crewai import Agent
import os

class GeneratorAgent:
    def __init__(self):
        self.agent = Agent(
            role='Solution Generator',
            goal='Generate comprehensive solutions based on analyzed requirements',
            backstory="""You are a creative solution architect who transforms 
            analyzed requirements into practical, innovative solutions. You excel 
            at generating detailed, actionable responses.""",
            verbose=True,
            allow_delegation=False,
            llm_config={
                'model': os.getenv('LLM_MODEL', 'gpt-3.5-turbo'),
                'temperature': 0.7
            }
        )
    
    def generate_solution(self, analysis, context=None):
        task_description = f"""
        Based on the following analysis, generate a comprehensive solution:
        
        Analysis: {analysis}
        
        Previous context: {context if context else 'No previous context'}
        
        Generate a solution that includes:
        1. Direct answer to the query
        2. Step-by-step explanation if applicable
        3. Examples or analogies
        4. Best practices and recommendations
        5. Potential pitfalls to avoid
        
        Make the solution practical and easy to understand.
        """
        
        return self.agent.execute(task_description)