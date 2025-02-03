using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class PlayerAnimation : MonoBehaviour
{
    [SerializeField] Animator animator;

    public void PlayPlayerAnimations(bool isWalking, bool isSprinting, bool isJumping, bool isDoubleJumping)
    {
        animator.SetBool("IsWalking", isWalking);
        animator.SetBool("IsSprinting", isSprinting);
        animator.SetBool("IsDoubleJump", isDoubleJumping);

        if(isJumping)
        {
            animator.SetTrigger("Jump");
        }

        Debug.Log("IsWalking" + isWalking);
        Debug.Log("IsSprinting" + isSprinting);
        Debug.Log("Jump" + isJumping);
        Debug.Log("IsDoubleJumping" + isDoubleJumping);
    }
}
