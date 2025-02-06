using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

public class UIQuestPainting : MonoBehaviour
{
    [SerializeField] GameSceneController gameSceneController;
    [SerializeField] QuestPainting quest;
    [SerializeField] GameObject introductionPanel;
    [SerializeField] GameObject descriptionPanel;
    [SerializeField] GameObject descriptionText1;
    [SerializeField] GameObject descriptionText2;
    [SerializeField] GameObject questPanel;
    [SerializeField] GameObject winPanel;
    [SerializeField] GameObject losePanel;

    [SerializeField] MeshRenderer easel;

    public Button talkButton;
    public Button nextButton;
    public Button startButton;

    Material whiteMaterial;

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

    public void OnEnterQuestClicked()
    {
        descriptionText2.SetActive(false);
        descriptionPanel.SetActive(false);
        startButton.gameObject.SetActive(false);
        questPanel.SetActive(true);

        quest.PrepareView();
        ShowNextPainting();
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

    public void OnHumanClicked()
    {
        // check if it was a correct answer
        if(quest.humanAnswers.Contains(quest.currentPainting))
        {
            quest.correctAnswersNumber++;
        }

        // increase current painitng
        if (quest.currentPainting + 1 < quest.paintingMaterials.Length)
        {
            quest.currentPainting++;
            ShowNextPainting();
        }
        else
        {
            // end quest
            questPanel.SetActive(false);

            if(quest.correctAnswersNumber == quest.paintingMaterials.Length)
            {
                winPanel.gameObject.SetActive(true);
                quest.isCompleted = true;
            }
            else
            {
                losePanel.gameObject.SetActive(true);
            }
        }
    }

    public void OnAIClicked()
    {
        // check if it was a correct answer
        if (quest.aiAnswers.Contains(quest.currentPainting))
        {
            quest.correctAnswersNumber++;
        }

        // increase current painitng
        if(quest.currentPainting + 1 < quest.paintingMaterials.Length)
        {
            quest.currentPainting++;
            ShowNextPainting();
        }
        else
        {
            // end quest
            questPanel.SetActive(false);

            if (quest.correctAnswersNumber == quest.paintingMaterials.Length)
            {
                winPanel.gameObject.SetActive(true);
                quest.isCompleted = true;
            }
            else
            {
                losePanel.gameObject.SetActive(true);
            }
        }
    }


    public void ShowNextPainting()
    {
        easel.material = quest.paintingMaterials[quest.currentPainting];
    }

    public void OnReplayClicked()
    {
        ResetUI();
        quest.ResetQuest();

    }

    public void ResetUI()
    {
        easel.material = quest.paintingMaterials[0];

        winPanel.gameObject.SetActive(false);
        losePanel.gameObject.SetActive(false);
        questPanel.gameObject.SetActive(true);
    }

    public void ClearUI()
    {
        whiteMaterial = new Material(Shader.Find("Standard"));
        whiteMaterial.color = Color.white;
        easel.material = whiteMaterial;

        winPanel.gameObject.SetActive(false);
        losePanel.gameObject.SetActive(false);
        questPanel.gameObject.SetActive(false);
    }
}
