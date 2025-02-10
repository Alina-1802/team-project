using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIQuestAds : MonoBehaviour
{
    [SerializeField] GameSceneController gameSceneController;
    [SerializeField] QuestAds quest;
    [SerializeField] GameObject introductionPanel;
    [SerializeField] GameObject descriptionPanel;
    [SerializeField] GameObject descriptionText1;
    [SerializeField] GameObject descriptionText2;
    [SerializeField] GameObject questPanel;
    [SerializeField] GameObject winPanel;
    [SerializeField] GameObject losePanel;

    public Button talkButton;
    public Button nextButton;
    public Button startButton;

    public void OnTalkButtonClicked()
    {
        gameSceneController.SetCurrentQuest(quest);
        talkButton.gameObject.SetActive(false);
        introductionPanel.SetActive(true);
    }

    public void OnReadQuestClicked()
    {
        introductionPanel.SetActive(false);
        descriptionPanel.SetActive(true);
        descriptionText1.SetActive(true);
        nextButton.gameObject.SetActive(true);
    }

    public void OnNextClicked()
    {
        descriptionText1.SetActive(false);
        descriptionText2.SetActive(true);
        nextButton.gameObject.SetActive(false);
        startButton.gameObject.SetActive(true);
    }

    IEnumerator DelayedAction()
    {
        yield return new WaitForSeconds(2f);
        questPanel.SetActive(true);
    }


    public void OnEnterQuestClicked()
    {
        /*        descriptionText2.SetActive(false);
                descriptionPanel.SetActive(false);
                startButton.gameObject.SetActive(false);
                questPanel.SetActive(true);*/
        descriptionText2.SetActive(false);
        descriptionPanel.SetActive(false);
        startButton.gameObject.SetActive(false);
        StartCoroutine(DelayedAction());

        quest.PrepareView();
    }


    public void OnExitQuestClicked()
    {
        talkButton.gameObject.SetActive(false);
        introductionPanel.SetActive(false);
        descriptionPanel.SetActive(false);

        quest.ExitQuest();
        ClearUI();
        gameSceneController.ClearCurrentQuest();
    }

    public void OnNoClicked()
    {
        talkButton.gameObject.SetActive(false);
        introductionPanel.SetActive(false);
        descriptionPanel.SetActive(false);

        ClearUI();
        gameSceneController.ClearCurrentQuest();
    }

    public void OnReplayClicked()
    {
        ResetUI();
        quest.ResetQuest();

    }

    public void OnConfirmClicked()
    {
        questPanel.SetActive(false);

        if (quest.IsCorrect())
        {
            winPanel.SetActive(true);
            quest.SetIsCompleted(true);
            gameSceneController.UpdateScore(quest);
        }
        else
        {
            losePanel.SetActive(true);
        }
    }

    public void ResetUI()
    {
        winPanel.gameObject.SetActive(false);
        losePanel.gameObject.SetActive(false);
        questPanel.gameObject.SetActive(true);
    }

    public void ClearUI()
    {
        winPanel.gameObject.SetActive(false);
        losePanel.gameObject.SetActive(false);
        questPanel.gameObject.SetActive(false);
    }
}
