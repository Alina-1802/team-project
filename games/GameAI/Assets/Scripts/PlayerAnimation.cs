using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class PlayerAnimation : MonoBehaviour
{
    [SerializeField] Animator animator;

    public void PlayPlayerAnimations(bool isWalking, bool isSprinting, bool isJumping)
    {
        animator.SetBool("IsWalking", isWalking);
        animator.SetBool("IsSprinting", isSprinting);

        if(isJumping)
        {
            animator.SetTrigger("Jump");
        }

        Debug.Log("IsWalking" + isWalking);
        Debug.Log("IsSprinting" + isSprinting);
        Debug.Log("Jump" + isJumping);
    }
}
