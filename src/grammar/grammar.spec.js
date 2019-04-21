import { describe, it } from 'mocha';
import { expect, assert } from 'chai';
import { _parseLine, parseLine } from './parse';
import testStrings from './grammar-test-strings';

describe('grammar', () => {
  it('should parse a Question ??? Answer ### Tags question', function test(done) {
    const result = parseLine('What is the capital of New York? ??? Albany ### geography, state capitals');
    assert.equal(result.question, 'What is the capital of New York?');
    assert.equal(result.answer, 'Albany');
    assert.equal(result.tags[0], 'geography');
    assert.equal(result.tags[1], 'state capitals');
    assert.equal(result.additionalParseResults.length, 0);
    done();
  });

  it('should parse a Question ??? Answer question', function test(done) {
    const result = parseLine('What is the capital of New York? ??? Albany');
    assert.equal(result.question, 'What is the capital of New York?');
    assert.equal(result.answer, 'Albany');
    assert.equal(result.tags.length, 0);
    assert.strictEqual(result.tags[0], undefined);
    assert.equal(result.additionalParseResults.length, 0);
    done();
  });

  it('should parse a Question question', function test(done) {
    const result = parseLine('What is the capital of New York?');
    assert.equal(result.question, 'What is the capital of New York?');
    assert.strictEqual(result.answer, null);
    assert.equal(result.tags.length, 0);
    assert.equal(result.additionalParseResults.length, 0);
    done();
  });

  it('should parse a Question xxx[blank] ### Tags question', function test(done) {
    const result = parseLine('The capital of New York is xxx[Albany] ### geography, state capitals');
    assert.equal(result.question, 'The capital of New York is ___');
    assert.strictEqual(result.answer, null);
    assert.equal(result.blanks.length, 1);
    assert.equal(result.blanks[0], 'Albany');
    assert.equal(result.tags.length, 2);
    assert.equal(result.additionalParseResults.length, 0);
    done();
  });

  it('should parse a Question xxx(blank) ### Tags question', function test(done) {
    const result = parseLine('The capital of New York is xxx[Albany] ### geography, state capitals');
    assert.equal(result.question, 'The capital of New York is ___');
    assert.strictEqual(result.answer, null);
    assert.equal(result.blanks.length, 1);
    assert.equal(result.blanks[0], 'Albany');
    assert.equal(result.tags.length, 2);
    assert.equal(result.additionalParseResults.length, 0);
    done();
  });

  it('should parse a Question Xxx(blank) ### Tags question', function test(done) {
    const result = parseLine('The capital of New York is xxx[Albany] ### geography, state capitals');
    assert.equal(result.question, 'The capital of New York is ___');
    assert.strictEqual(result.answer, null);
    assert.equal(result.blanks.length, 1);
    assert.equal(result.blanks[0], 'Albany');
    assert.equal(result.tags.length, 2);
    assert.equal(result.additionalParseResults.length, 0);
    done();
  });

  it('should parse a Question Xxx(blank) question', function test(done) {
    const result = parseLine('The capital of New York is xxx[Albany]');
    assert.equal(result.question, 'The capital of New York is ___');
    assert.strictEqual(result.answer, null);
    assert.equal(result.blanks.length, 1);
    assert.equal(result.blanks[0], 'Albany');
    assert.equal(result.tags.length, 0);
    assert.equal(result.additionalParseResults.length, 0);
    done();
  });

  it('should not error on any of the test strings', function test(done) {
    testStrings.forEach(line => {
      const result = parseLine(line);
      assert.notExists(result.error);
      assert.isOk(result.question);
      assert.equal(result.additionalParseResults.length, 0);
    });
    done();
  });

  // it('should error on malformed strings', function test(done) {
  //   const result = parseLine('hello ### tag1, tag2, ??? something', false);
  //   assert.exists(result.error);
  //   assert.notExists(result.question);
  //   done();
  // });
});
