using System.Collections;
using System.Collections.Generic;
using UnityEditor.Animations;
using UnityEngine;

public class GameSceneController : MonoBehaviour
{
    [SerializeField] PlayerController player;

    public PlayerController Player
    { get { return player; } }
}
