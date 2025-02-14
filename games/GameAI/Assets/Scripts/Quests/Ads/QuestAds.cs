using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class QuestAds : Quest
{
    [SerializeField] UIQuestAds uiController;
    [SerializeField] CameraFocusController cameraFocusController;
    [SerializeField] GameSceneController gameSceneController;
    [SerializeField] Slot[] slots;

    private bool isStarted = false;

    private Vector3 cameraPosition = new Vector3(114.16f, 2.03f, -112.83f);
    private Vector3 cameraRotation = new Vector3(0f, 180f, 0f);
    private Vector3 playerPosition = new Vector3(112.73f, 0.00f, -109.55f);

    private void OnTriggerEnter(Collider other)
    {
        uiController.talkButton.GetComponentInChildren<TextMeshProUGUI>().text = "Porozmawiaj z Piotrem";
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

        // to do:
        foreach (Slot slot in slots)
        {
            Draggable action = slot.GetComponentInChildren<Draggable>();

            if (action != null)
            {
                if (action.number != slot.number)
                {
                    return false;
                }
            }
        }

        return true;
    }
}
