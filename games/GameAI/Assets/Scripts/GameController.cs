using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameController : MonoBehaviour
{
    public PlayState playState = new PlayState();
    public MainMenuState mainMenuState = new MainMenuState();
    public ChallengeState challengeState = new ChallengeState();
    BaseState currentState;

    private void Awake()
    {
        DontDestroyOnLoad(this.gameObject);
    }

    void Start()
    {
        currentState = mainMenuState;
        currentState.EnterState(this);
    }

    void Update()
    {
        currentState.UpdateState(this);
        //Debug.Log("State" + currentState.ToString());
    }

    public void SwitchState(BaseState newState)
    {
        currentState.ExitState(this);
        currentState = newState;
        currentState.EnterState(this);
    }
}
