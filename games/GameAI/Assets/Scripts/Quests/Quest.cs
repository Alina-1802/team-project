using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class Quest: MonoBehaviour
{
    [SerializeField] protected bool isCompleted = false;

    abstract public void PrepareView();
    abstract public bool IsStarted();
    abstract public void UpdateQuest();

    abstract public void ExitQuest();
    public bool IsCompleted()
    {
        return isCompleted;
    }

    public void SetIsCompleted(bool isCompleted)
    {
        this.isCompleted = isCompleted;
    }
}
