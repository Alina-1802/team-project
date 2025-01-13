using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameController : MonoBehaviour
{
    public static GameController Instance { get; private set; }

    BaseState currentState;

    public PlayState playState = new PlayState();
    public MainMenuState mainMenuState = new MainMenuState();
    public ChallengeState challengeState = new ChallengeState();

    public GameSceneController gameSceneController;

    private void Awake()
    {
        DontDestroyOnLoad(this.gameObject);

        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    void Start()
    {
        currentState = mainMenuState;
        currentState.EnterState(this);
    }

    void Update()
    {
        currentState.UpdateState(this);
    }

    public void SwitchState(BaseState newState)
    {
        currentState.ExitState(this);
        currentState = newState;
        currentState.EnterState(this);
    }

    public void SetGameSceneController()
    {
        this.gameSceneController = GameObject.FindObjectOfType<GameSceneController>();
    }
}
