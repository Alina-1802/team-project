using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Slot : MonoBehaviour, IDropHandler
{
    public int number;
    public void OnDrop(PointerEventData eventData)
    {
        if (eventData.pointerDrag != null)
        {
            GameObject dropped = eventData.pointerDrag;
            Draggable draggable = dropped.GetComponent<Draggable>();

            if (transform.childCount != 0)
            {
                GameObject current = transform.GetChild(0).gameObject;
                Draggable currentDraggable = current.GetComponent<Draggable>();

                currentDraggable.transform.SetParent(draggable.parentAfterDrag);
            }
            draggable.parentAfterDrag = transform;
             
        }
    }
}
