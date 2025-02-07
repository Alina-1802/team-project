using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class UIGameSceneController : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI scoreText;
    [SerializeField] GameObject FinishPanel;

    public void ShowScoreText()
    {
        scoreText.gameObject.SetActive(true);
    }
    public void HideScoreText()
    {
        scoreText.gameObject.SetActive(false);
    }

    public void UpdateScoreText(int newScore)
    {
        scoreText.text = "Quests\n" + newScore + "/3";
    }

    public void ShowFinishPanel()
    {
        FinishPanel.SetActive(true);
    }

    public void HideFinishPanel()
    {
        FinishPanel.SetActive(false);
    }
}
