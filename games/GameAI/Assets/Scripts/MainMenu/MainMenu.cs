using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MainMenu : MonoBehaviour
{
    //[SerializeField] Button playButton;
    [SerializeField] GameController gameController;
    [SerializeField] AudioSource audioSource;

    public void OnPlayButtonClicked()
    {
        SceneManager.LoadScene("Game");
        gameController.SwitchState(gameController.playState);
        audioSource.Play();
    }
    public void OnButtonClicked()
    {
        audioSource.Play();
    }

    public void OnExitButtonClicked()
    {
        audioSource.Play();
#if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
        #else
        Application.Quit();
        #endif
    }
}
