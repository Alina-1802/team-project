using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameController : MonoBehaviour
{
    public static GameController Instance { get; private set; }

    BaseState currentState;

    public PlayState playState = new PlayState();
    public MainMenuState mainMenuState = new MainMenuState();
    public QuestState questState = new QuestState();

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
        if(SceneManager.GetActiveScene().name == "MainMenu")
        {
            currentState = mainMenuState;
        }
        else if(SceneManager.GetActiveScene().name == "Game")
        {
            currentState = playState;
        }
        currentState.EnterState(this);
    }

    void Update()
    {
        currentState.UpdateState(this);
    }

    public void SwitchState(BaseState newState)
    {
        if(currentState != null)
        {
            currentState.ExitState(this);
        }

        currentState = newState;
        currentState.EnterState(this);
    }

    public void SetGameSceneController()
    {
        this.gameSceneController = GameObject.FindObjectOfType<GameSceneController>();
    }
}
