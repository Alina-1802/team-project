using Cinemachine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFocusController : MonoBehaviour
{
    [SerializeField] CinemachineVirtualCamera questCamera;
    [SerializeField] CinemachineFreeLook playerCamera;

    public void FocusOnQuest(Vector3 cameraPosition)
    {
        questCamera.transform.position = cameraPosition;

        playerCamera.Priority--;
        questCamera.Priority++;
    }

    public void FocusOnPlayer()
    {
        questCamera.Priority--;
        playerCamera.Priority++;
    }
}
