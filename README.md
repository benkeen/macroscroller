## MacroScroller

#### In development

```jsx harmony
<MacroScroller />
```

This component handles displaying massive data sets with a scrollbar allowing you to scroll to any place in the list.

This provides a workaround for the max size limitation of a single DOM element within a browser. The exact value changes
depending on a browser, but I found on Chrome (33.7 million max) it equates to around 1.7 million possible rows (~20px
high). 


TODO:
- pass actual data & piecemeal load data
