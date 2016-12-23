'use strict';

/*
In this example, extensions are contracts that are only exposed during
the initialize phase
*/
export default class ElasticsearchClient {
  constructor(elasticsearchService) {
    Object.defineProperty(this, 'service', { value: elasticsearchService });
  }

  createClient(name, config) {
    this.service.createClient(name, config);
  }
}

/*
And here's an example of lifecycle based extensions
*/
export class ElasticsearchClientLifecycle {
  constructor(elasticsearchService) {
    Object.defineProperty(this, 'service', { value: elasticsearchService });
  }

  exportInitialize() {
    return {
      createClient(name, config) {
        this.service.createClient(name, config);
      }

      getClient(name) {
        return this.service.getClient(name);
      }
    };
  }

  exportStart() {
    return {
      getClient(name) {
        return this.service.getClient(name);
      }
    };
  }
}
