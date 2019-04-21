import { describe, it } from 'mocha';
import { expect, assert } from 'chai';
import { parseLine } from './parse';

describe('grammar', () => {
  it('should parse a Question ??? Answer ### Tags question', function test(done) {
    const result = parseLine('What is the capital of New York? ??? Albany ### geography, state capitals');
    assert.equal(result.question, 'What is the capital of New York?');
    assert.equal(result.answer, 'Albany');
    assert.equal(result.tags[0], 'geography');
    assert.equal(result.tags[1], 'state capitals');
    done();
  });

  it('should parse a Question ??? Answer question', function test(done) {
    const result = parseLine('What is the capital of New York? ??? Albany');
    assert.equal(result.question, 'What is the capital of New York?');
    assert.equal(result.answer, 'Albany');
    assert.equal(result.tags.length, 0);
    assert.strictEqual(result.tags[0], undefined);
    done();
  });

  it('should parse a Question question', function test(done) {
    const result = parseLine('What is the capital of New York?');
    assert.equal(result.question, 'What is the capital of New York?');
    assert.strictEqual(result.answer, null);
    assert.equal(result.tags.length, 0);
    done();
  });
});
