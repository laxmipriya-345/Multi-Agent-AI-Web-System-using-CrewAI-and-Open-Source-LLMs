from crewai import Agent
import os

class AnalyzerAgent:
    def __init__(self):
        self.agent = Agent(
            role='Content Analyzer',
            goal='Analyze user queries and break them down into key components',
            backstory="""You are an expert analyst who excels at understanding 
            complex queries and breaking them down into actionable components. 
            You identify patterns, requirements, and underlying needs.""",
            verbose=True,
            allow_delegation=False,
            llm_config={
                'model': os.getenv('LLM_MODEL', 'gpt-3.5-turbo'),
                'temperature': 0.3
            }
        )
    
    def analyze_query(self, query, context=None):
        task_description = f"""
        Analyze the following user query and provide:
        1. Main intent (what user wants to achieve)
        2. Key requirements (specific needs)
        3. Complexity level (simple/medium/complex)
        4. Required domain knowledge
        5. Potential challenges
        
        Query: {query}
        
        Context: {context if context else 'No previous context'}
        
        Provide your analysis in a structured JSON format.
        """
        
        return self.agent.execute(task_description)