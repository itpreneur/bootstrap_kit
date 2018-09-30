//import { groupBy } from "lodash-es"; //without using library
import people from "./people";
import "./styles.scss";
import "./image-example";
const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
const managerGroups = groupBy(people, "manager");

const root = document.createElement("div");
root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`;
document.body.appendChild(root);
