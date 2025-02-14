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
        gameController.gameSceneController.uiGameSceneController.HideScoreText();
    }
    public override void UpdateState(GameController gameController)
    {
        currentQuest = gameController.gameSceneController.currentQuest;

        if (currentQuest == null)
        {
            gameController.gameSceneController.uiGameSceneController.UpdateScoreText(gameController.gameSceneController.GetScore());
            gameController.gameSceneController.uiGameSceneController.ShowScoreText();
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