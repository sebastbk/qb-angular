export {}

if (!String.prototype.hasOwnProperty('getWordAt')) {
  String.prototype.getWordAt = function (index: number): string {
  let left = this.slice(0, index).search(/\S*$/),
      right = this.slice(index).search(/\s/);
  return right < 0
    ? this.slice(left)
    : this.slice(left, right + index);
  }
}

if (!String.prototype.hasOwnProperty('replaceWordAt')) {
  String.prototype.replaceWordAt = function (index: number, word: string): string {
  let left = this.slice(0, index).search(/\S*$/),
      right = this.slice(index).search(/\s/);
  return right < 0
    ? this.slice(0, left) + word
    : this.slice(0, left) + word + this.slice(right + index);
  }
}