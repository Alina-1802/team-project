using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayState : BaseState
{
    private bool firstWin = true;
    public override void EnterState(GameController gameController)
    {
        gameController.gameSceneController.uiGameSceneController.ShowScoreText();
    }
    public override void UpdateState(GameController gameController)
    {
        if(gameController.gameSceneController == null)
        {
            gameController.SetGameSceneController();
        }
        else
        {
            gameController.gameSceneController.Player.UpdatePlayer();


            if(gameController.gameSceneController.currentQuest != null)
            {
                gameController.SwitchState(gameController.questState);
            }

            if(gameController.gameSceneController.GetScore() == 3 && firstWin)
            {
                gameController.gameSceneController.uiGameSceneController.ShowFinishPanel();
                firstWin = false;
            }
        }
    }
    public override void ExitState(GameController gameController)
    {

    }
}
