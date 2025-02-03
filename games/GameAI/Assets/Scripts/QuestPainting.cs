using Cinemachine;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;

public class QuestPainting : Quest
{
    [SerializeField] UIController uiController;
    [SerializeField] CameraFocusController cameraFocusController;
    [SerializeField] GameSceneController gameSceneController;
    public Material[] paintingMaterials;
    public bool isCompleted = false;
    private bool isStarted = false;

    private Vector3 cameraPosition = new Vector3(2.64f, 1.94f, -64.77f);
    private Vector3 playerPosition = new Vector3(0.76f, 0.00f, -70.44f);

    public int correctAnswersNumber = 0;
    public int currentPainting = 0;

    public int[] aiAnswers = { 1, 4, 5, 7 };
    public int[] humanAnswers = { 0, 2, 3, 6 };


    private void OnTriggerEnter(Collider other)
    {
        uiController.talkButton.GetComponentInChildren<TextMeshProUGUI>().text = "Porozmawiaj z Tosi¹";
        uiController.talkButton.gameObject.SetActive(true);
    }

    private void OnTriggerExit(Collider other)
    {
        uiController.talkButton.gameObject.SetActive(false);
    }

    override public void PrepareView()
    {
        // set new position of player
        gameSceneController.Player.playerMovement.SetPlayerPosition(playerPosition);

        // set camera 
        cameraFocusController.FocusOnQuest(cameraPosition);
    }


    override public bool IsStarted()
    {
        return isStarted;
    }

    override public void UpdateQuest()
    {

    }

    override public void ExitQuest()
    {
        cameraFocusController.FocusOnPlayer();
        //uiController.ClearUI();

        currentPainting = 0;
        correctAnswersNumber = 0;
    }

    public void ResetQuest()
    {
        currentPainting = 0;
        correctAnswersNumber = 0;

        //uiController.ResetUI();
    }
}