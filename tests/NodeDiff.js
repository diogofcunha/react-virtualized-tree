export default class NodeDiff {
  added = new Set();
  deleted = new Set();
  changed = new Set();
  _original = new Map();

  constructor(originalContainer) {
    originalContainer.querySelectorAll('[data-type="node"]').forEach(n => {
      this._original.set(n.dataset.testid, n.innerHTML);
    });
  }

  run(finalContainer) {
    finalContainer.querySelectorAll('[data-type="node"]').forEach(n => {
      const nodeId = n.dataset.testid;

      if (this._original.has(nodeId)) {
        if (this._original.get(nodeId) !== n.innerHTML) {
          this.changed.add(nodeId);
        }

        this._original.delete(nodeId);
      } else {
        this.added.add(nodeId);
      }
    });

    [...this._original.keys()].forEach(k => {
      this.deleted.add(k);
    });

    return {
      mounted: [...this.added],
      unmounted: [...this.deleted],
      changed: [...this.changed],
    };
  }
}
