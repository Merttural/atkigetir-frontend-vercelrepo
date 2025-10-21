// Request Queue Utility - Rate limit sorunlarını çözmek için
class RequestQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.maxConcurrent = 5; // Aynı anda maksimum 5 istek
    this.delay = 100; // İstekler arası 100ms bekleme
  }

  async add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        requestFn,
        resolve,
        reject
      });
      
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.maxConcurrent);
      
      const promises = batch.map(async ({ requestFn, resolve, reject }) => {
        try {
          const result = await requestFn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      await Promise.allSettled(promises);
      
      // Batch'ler arası bekleme
      if (this.queue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, this.delay));
      }
    }

    this.processing = false;
  }
}

// Global request queue instance
export const requestQueue = new RequestQueue();

// Rate limit friendly fetch wrapper
export const rateLimitFetch = async (url, options = {}) => {
  return requestQueue.add(async () => {
    const response = await fetch(url, options);
    
    // Rate limit kontrolü
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
      
      console.log(`Rate limit hit, waiting ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry
      return fetch(url, options);
    }
    
    return response;
  });
};

// Exponential backoff retry
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
