using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class QuestState : BaseState
{
    Quest currentQuest;

    public override void EnterState(GameController gameController)
    {
        // stop player animation
        gameController.gameSceneController.Player.ResetPlayer();
    }
    public override void UpdateState(GameController gameController)
    {
        currentQuest = gameController.gameSceneController.currentQuest;

        if (currentQuest == null)
        {
            ExitState(gameController);
            gameController.SwitchState(gameController.playState);
        }
    }
    public override void ExitState(GameController gameController)
    {
        if(currentQuest != null)
        {
            currentQuest.ExitQuest();
        }
    }
}