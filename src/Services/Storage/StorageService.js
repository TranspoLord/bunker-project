export const GetItemListFromLevel = (level) => {
  if (level) {
    let items = localStorage.getItem("bunker-" + level + "-itemList");
    const itemList = JSON.parse(items);
    console.log("Current list of items not in levels: ", itemList);
    return itemList;
  } else {
    return [];
  }
};
