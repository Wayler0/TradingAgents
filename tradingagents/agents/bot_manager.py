# Import all agents
from tradingagents.agents.agent1 import agent1_function
from tradingagents.agents.agent2 import agent2_function
from tradingagents.agents.agent3 import agent3_function

def run_bot(user_request):
    """
    Determines which agent(s) to run based on the user's request.
    """
    user_request = user_request.lower()

    # Example logic: map keywords to agents
    if "stock" in user_request:
        return agent1_function(user_request)
    elif "crypto" in user_request:
        return agent2_function(user_request)
    elif "analysis" in user_request:
        return agent3_function(user_request)
    else:
        # Run all agents if unsure
        results = []
        results.append(agent1_function(user_request))
        results.append(agent2_function(user_request))
        results.append(agent3_function(user_request))
        return results