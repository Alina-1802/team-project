using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class Quest: MonoBehaviour
{
    abstract public void PrepareView();
    abstract public bool IsStarted();
    abstract public void UpdateQuest();

    abstract public void ExitQuest();
}
