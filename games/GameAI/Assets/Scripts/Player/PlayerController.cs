using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public PlayerMovement playerMovement;
    [SerializeField] PlayerAnimation playerAnimation;

    public void UpdatePlayer()
    {
        playerMovement.MovePlayer();
        playerAnimation.PlayPlayerAnimations(playerMovement.IsWalking, playerMovement.IsSprinting, playerMovement.IsJumping, playerMovement.IsDoubleJumping);
    }

    public void ResetPlayer()
    {
        playerAnimation.PlayPlayerAnimations(false, false, false, false);
    }
}
