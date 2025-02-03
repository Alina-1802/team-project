using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayState : BaseState
{
    public override void EnterState(GameController gameController)
    {

    }
    public override void UpdateState(GameController gameController)
    {
        Debug.Log("play stat");

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
        }
    }
    public override void ExitState(GameController gameController)
    {

    }
}
