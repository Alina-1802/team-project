using System.Collections;
using System.Collections.Generic;
using UnityEngine;

#if UNITY_EDITOR
using UnityEditor.Animations;
#endif

public class GameSceneController : MonoBehaviour
{
    [SerializeField] PlayerController player;
    [SerializeField] GameObject gameControllerPrefab;

    //[SerializeField] Quest[] quests;


    public PlayerController Player
    { get { return player; } }

    public Quest currentQuest;

    private void Start()
    {

        if (GameObject.FindObjectOfType<GameController>() == null)
        {
            GameObject gameControllerObject = Instantiate(gameControllerPrefab);
            GameController gameController = gameControllerObject.GetComponent<GameController>();
            gameController.SetGameSceneController();
        }
    }

    public void SetCurrentQuest(Quest quest)
    {
        currentQuest = quest;
    }

    public void ClearCurrentQuest()
    {
        currentQuest = null;
    }
}
