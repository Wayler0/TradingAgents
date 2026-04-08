# Refactored analysis logic for API use
from tradingagents.default_config import DEFAULT_CONFIG
from cli.main import TradingAgentsGraph, ANALYST_ORDER, StatsCallbackHandler
import time
from pathlib import Path

def run_analysis_api(selections: dict) -> dict:
    """
    Run analysis with given selections and return results as a dict.
    selections: {
        'ticker': str,
        'analysis_date': str,
        'analysts': list of str,
        'research_depth': int,
        'shallow_thinker': str,
        'deep_thinker': str,
        'llm_provider': str,
        ...
    }
    """
    config = DEFAULT_CONFIG.copy()
    config["max_debate_rounds"] = selections["research_depth"]
    config["max_risk_discuss_rounds"] = selections["research_depth"]
    config["quick_think_llm"] = selections["shallow_thinker"]
    config["deep_think_llm"] = selections["deep_thinker"]
    config["llm_provider"] = selections["llm_provider"].lower()
    config["google_thinking_level"] = selections.get("google_thinking_level")
    config["openai_reasoning_effort"] = selections.get("openai_reasoning_effort")
    config["anthropic_effort"] = selections.get("anthropic_effort")

    stats_handler = StatsCallbackHandler()
    selected_set = set(selections["analysts"])
    selected_analyst_keys = [a for a in ANALYST_ORDER if a in selected_set]
    graph = TradingAgentsGraph(
        selected_analyst_keys,
        config=config,
        debug=True,
        callbacks=[stats_handler],
    )
    start_time = time.time()
    init_agent_state = graph.propagator.create_initial_state(
        selections["ticker"], selections["analysis_date"]
    )
    args = graph.propagator.get_graph_args(callbacks=[stats_handler])
    trace = []
    for chunk in graph.graph.stream(init_agent_state, **args):
        trace.append(chunk)
    final_state = trace[-1]
    # Return the final state and trace for API response
    return {
        "final_state": final_state,
        "trace": trace,
        "elapsed": time.time() - start_time,
    }
