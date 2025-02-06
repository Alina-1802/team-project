using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class QuestMachineLearning : Quest
{
    [SerializeField] UIQuestMachineLearning uiController;
    [SerializeField] CameraFocusController cameraFocusController;
    [SerializeField] GameSceneController gameSceneController;
    [SerializeField] Slot[] slots;

    public bool isCompleted = false;
    private bool isStarted = false;

    private Vector3 cameraPosition = new Vector3(74.29f, 1.87f, -6.01f);
    private Vector3 cameraRotation = new Vector3(0f, 180f, 0f);
    private Vector3 playerPosition = new Vector3(75.80f, 0.00f, -1.15f);

    private void OnTriggerEnter(Collider other)
    {
        uiController.talkButton.GetComponentInChildren<TextMeshProUGUI>().text = "Porozmawiaj z Antonim";
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
        cameraFocusController.FocusOnQuest(cameraPosition, cameraRotation);
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
    }

    public void ResetQuest()
    {

    }

    public bool IsCorrect()
    {
        foreach(Slot slot in slots)
        {
            Draggable action = slot.GetComponentInChildren<Draggable>();

            if (action != null)
            {
                if(action.number != slot.number)
                {
                    return false;
                }
            }
        }

        return true;
    }
}
