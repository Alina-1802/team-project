using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField] CharacterController characterController;
    [SerializeField] Transform cam;
    [SerializeField] float speed = 6f;
    private float minSpeed = 0.1f;
    private float turnSmoothTime = 0.1f;
    private float turnSmoothVelocity;

    [SerializeField] Transform groundCheck;
    [SerializeField] LayerMask groundMask;
    private Vector3 velocity;
    private float gravity = -9.81f;
    private float groundDistance = 0.4f;
    private bool isGrounded = false;
    private float jumpForce = 3f;
    private float fallingSpeed = 2f;

    public void MovePlayer()
    {
        float horizontalInput = Input.GetAxisRaw("Horizontal");
        float verticalInput = Input.GetAxisRaw("Vertical");
        bool jumpInput = Input.GetButtonDown("Jump");

        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);

        if (isGrounded && velocity.y < 0)
        {
            velocity.y = -2f;
        }

        Vector3 direction = new Vector3(horizontalInput, 0f, verticalInput).normalized;

        if (direction.magnitude >= minSpeed)
        {
            float targetAngle = Mathf.Atan2(direction.x, direction.z) * Mathf.Rad2Deg + cam.eulerAngles.y;
            float angle = Mathf.SmoothDampAngle(transform.eulerAngles.y, targetAngle, ref turnSmoothVelocity, turnSmoothTime);
            transform.rotation = Quaternion.Euler(0f, angle, 0f);

            Vector3 moveDirection = Quaternion.Euler(0f, targetAngle, 0f) * Vector3.forward;
            characterController.Move(moveDirection.normalized * speed * Time.deltaTime);
        }

        if(isGrounded && jumpInput)
        {
            velocity.y = Mathf.Sqrt(jumpForce * -2f * gravity);
        }
        velocity.y += gravity * Time.deltaTime * fallingSpeed;
        characterController.Move(velocity * Time.deltaTime);
    }
}
