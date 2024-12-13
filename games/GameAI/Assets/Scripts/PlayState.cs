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
        if(gameController.gameSceneController == null)
        {
            gameController.SetGameSceneController();
        }
        else
        {
            
        }
    }
    public override void ExitState(GameController gameController)
    {

    }
}
