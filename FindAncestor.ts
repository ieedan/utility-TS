/** Will recursively search the DOM for the node matching the passed function 
 * until it reaches the document at which point it will return null.
 * 
 * ```ts
 * // Ex: You get the target from the mouse event target 
 * // and search up the document for the required node
 * let ancestor = e.target;
 * ancestor = findAncestor(ancestor, (target) => {
				    return target.getAttribute("data-value") !== null;
			});
 * ```
 * 
 * @param target the current node in the document
 * @param found function to determine if the passed node is the node you are looking for in the document
 * @returns 
 */
const findAncestor = (target: Node, found: (target:Node | null) => boolean): ParentNode | null => {
    if (target.parentNode === document) return null;
    
    if (found(target.parentNode)) return target.parentNode;

    return findAncestor(target.parentNode as Node, found);
}

export default findAncestor