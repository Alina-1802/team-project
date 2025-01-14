using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] PlayerMovement playerMovement;
    [SerializeField] PlayerAnimation playerAnimation;

    public void UpdatePlayer()
    {
        playerMovement.MovePlayer();
        playerAnimation.PlayPlayerAnimations(playerMovement.IsWalking, playerMovement.IsSprinting, playerMovement.IsJumping);
    }
}
