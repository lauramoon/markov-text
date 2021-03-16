const {MarkovMachine} = require('./markov');
let mm;

beforeEach(() => {
    mm = new MarkovMachine('the cat in the hat comes back to back');
});

test('makes word list', () => {
    expect(mm.words.length).toEqual(9);
    expect(mm.words[0]).toEqual('the');
    expect(mm.words).toContain('cat');
});

test('makes word chains', () => {
    expect(Object.keys(mm.chains).length).toEqual(7);
    expect(mm.chains['the']).toEqual(['cat', 'hat']);
    expect(mm.chains['back']).toEqual(['to', null]);
    expect(Object.keys(mm.chains)).toContain('comes');
})

test('makes Markov text', () => {
    let text = mm.makeText(7);
    expect(text.split(' ').length).toEqual(7);
    expect(mm.words).toContain(text.split(' ')[0]);
})