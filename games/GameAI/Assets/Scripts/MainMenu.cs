using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MainMenu : MonoBehaviour
{
    //[SerializeField] Button playButton;
    [SerializeField] GameController gameController;

    public void OnPlayButtonClicked()
    {
        SceneManager.LoadScene("Game");
        gameController.SwitchState(gameController.playState);
    }

    public void OnExitButtonClicked()
    {
        #if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
        #else
        Application.Quit();
        #endif
    }
}
