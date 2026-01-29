# Shopping List (React)

## Stories

1. View a list of items on a shopping list
2. Add items to the shopping list
3. Remove stuff from the shopping list
4. When I’ve bought something from my list I want to be able to cross it off the list
5. Persist the data so I can view the list if I move away from the page
6. I want to be able to reorder items on my list
7. Total up the prices
8. Put a spending limit in place, alert me if I go over the limit
9. I want to share my shopping list via email
10. User and password protect

## Present Solution

Users can add items to the list, remove items from it and cross off those they have bought (stories 1 to 4).

Whilst I read through the entire list before I began to build the application I chose not to code ahead, i.e. I did not create the form when I created the list for the first story. My approach was to treat this as a project where I would be coming in to add previously unthought of functionality to what was already there at each stage rather than as a greenfield where I could plan ahead.

That meant adding the form for the second story; refactoring the feedback messaging in to its own component for the third; and turning the item array in to an array of objects for the fourth.

With that last change now in place, the application is well placed for further fields such as item price (stories 7 & 8) or quantity (not on the story list but certainly a possible extension) to be added. Those have been added as optional parameters to the `Item` interface.

At each stage I have also included unit/implementation and end-to-end testing.
