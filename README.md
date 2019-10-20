## Monster Lists

#### In development

```jsx harmony
<MonsterList />
```

This component handles displaying massive data sets with a scrollbar allowing you to scroll to any place in the list. Other libraries 
like react-window accommodate infinite scrolling by appending the results to the end. You *can* this to convert it 
to a single scrollable

This provides a workaround for the max size limitation of a single DOM element within a browser. The exact value changes
depending on a browser, but I found on Chrome (33.7 million max) it equates to around 1.7 million possible rows (~20px
high). 


TODO:
1. Currently hardcoded proof of concept with 20 million rows. Update to work with custom any custom size (`totalRows` prop).
2. pass actual 
3. piecemeal load data
