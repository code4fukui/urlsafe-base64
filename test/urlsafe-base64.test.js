//import { assert, describe, it } from "https://code4fukui.github.io/describe/describe.js";
import { assert, describe, it } from "../../describe/describe.js";
import { Buffer } from "https://taisukef.github.io/buffer/Buffer.js";

/**
 * URL Safe Base64 Unit Tests
 */

/**
 * Module dependencies.
 */

import URLSafeBase64 from "../index.js";

const SafeCharacters = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 - _'.split(' ');
const UnsafeCharacters = '+ / \\ = ` ~ ! @ # $ % ^ & * ( ) " \' ; : [ ] { } | < > , . ?'.split(' ');

/**
 * Tests
 */


describe('URL Safe Base64', function () {

  describe('.version', function () {

    it('should match the format x.x.x', function (done) {
      assert(URLSafeBase64.version.match(/^\d+\.\d+\.\d+$/));
      done();
    });

  });

  describe('.encode', function () {

    it('should be a function', function (done) {
      assert(typeof URLSafeBase64.encode == "function");
      done();
    });

    it('should encode a buffer correctly', function (done) {
      var testBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          testBuffer = new Buffer(testBase64, 'base64'),
          expectedBase64 = testBase64.replace('+', '-').replace('/', '_');
      assert.equal(URLSafeBase64.encode(testBuffer), expectedBase64);
      done();
    });

  });

  describe('.decode', function () {

    it('should be a function', function (done) {
      assert(typeof URLSafeBase64.decode == "function");
      done();
    });

    it('should decode a base64 string correctly', function (done) {
      var encodedBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/',
          normalBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          testBuffer = new Buffer(normalBase64, 'base64'),
          decoded = URLSafeBase64.decode(encodedBase64);
      assert(decoded instanceof Buffer);
      assert.equal(decoded.toString('utf8'), testBuffer.toString('utf8'));
      done();
    });

  });

  describe('.validate', function () {

    it('should be a function', function (done) {
      assert(typeof URLSafeBase64.validate == "function");
      done();
    });

    it('should return true for strings of allowed characters', function (done) {
      var i;
      for (i = 0; i < SafeCharacters.length; i += 1) {
        assert(URLSafeBase64.validate(SafeCharacters[i]));
      };
      assert(URLSafeBase64.validate(SafeCharacters.join('')));
      done();
    });

    it('should return false for strings that do not contain only allowed characters ', function (done) {
      var i;
      for (i = 0; i < UnsafeCharacters.length; i += 1) {
        assert(!(URLSafeBase64.validate(SafeCharacters.join('') + UnsafeCharacters[i])));
      };
      done();
    });

  });

});