using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;

#if UNITY_EDITOR
using UnityEditor.Animations;
#endif

public class GameSceneController : MonoBehaviour
{
    [SerializeField] PlayerController player;
    [SerializeField] GameObject gameControllerPrefab;
    public UIGameSceneController uiGameSceneController;
    int score = 0;

    public bool[] questsScore = { false, false, false };
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

    public void UpdateScore(Quest currentQuest)
    {
        UpdateQuestsScore(currentQuest);
        score = questsScore.Count(x => x);
    }

    public void UpdateQuestsScore(Quest currentQuest)
    {
        if (currentQuest == null)
        {
            return;
        }

        if (currentQuest.IsCompleted())
        {
            if (currentQuest.GetType() == typeof(QuestPainting))
            {
                questsScore[0] = true;
            }
            else if (currentQuest.GetType() == typeof(QuestMachineLearning))
            {
                questsScore[1] = true;
            }
            else if (currentQuest.GetType() == typeof(QuestAds))
            {
                questsScore[2] = true;
            }
        }
    }

    public int GetScore() { return score; }

}
