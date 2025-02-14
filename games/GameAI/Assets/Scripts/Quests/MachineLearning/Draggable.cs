using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class Draggable : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler
{
    public Transform parentAfterDrag;
    public Image image;
    public int number;

    public void OnBeginDrag(PointerEventData eventData)
    {
        parentAfterDrag = transform.parent;
        transform.SetParent(transform.root);
        transform.SetAsLastSibling();
        image.raycastTarget = false;

        TMP_Text tmpText = GetComponentInChildren<TMP_Text>();
        if (tmpText != null)
        {
            tmpText.raycastTarget = false;
        }
    }

    public void OnDrag(PointerEventData eventData)
    {
        transform.position = Input.mousePosition;
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        transform.SetParent(parentAfterDrag);
        transform.position = parentAfterDrag.position;
        image.raycastTarget = true;

        TMP_Text tmpText = GetComponentInChildren<TMP_Text>();
        if (tmpText != null)
        {
            tmpText.raycastTarget = true;
        }
    }
}
