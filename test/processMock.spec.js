const processMock = require('../lib/processMock')

describe('transform', () => {
  test('case - 1', () => {
    const mockData = {
      result: {
        '@success': {
          msg: 'Hello Kitty',
          data: {
            name: 'kitty',
            age: 7
          },
        },
        '@error': {
          msg: 'Bye Kitty'
        }
      },
      '@good': {
        status: 200
      },
      '@bad': {
        status: 400
      }
    }
  
    const rule = `[
      result [ @success ],
      @good
    ]`
  
    expect(processMock(mockData, rule)).toEqual({
      result: {
        msg: 'Hello Kitty',
        data: {
          name: 'kitty',
          age: 7
        },
      },
      status: 200
    })
  })

  test('case - 2', () => {
    const mockData = {
      result: {
        data: 'hello'
      },
      '@good': {
        status: 200
      },
      '@bad': {
        status: 400
      }
    }
  
    const rule = `[
      @good
    ]`
  
    expect(processMock(mockData, rule)).toEqual({
      result: {
        data: 'hello'
      },
      status: 200
    })
  })

  test('case - 3', () => {
    const mockData = {
      status: {
        '@good': 200,
        '@bad': 401
      }
    }
  
    const rule = `[
      status [ @good ]
    ]`
  
    expect(processMock(mockData, rule)).toEqual({
      status: 200
    })
  })
})

describe('rule format validate', () => {
  test('case - 1', () => {
    const mockData = {
      '@good': {
        status: 200
      },
      '@bad': {
        status: 400
      }
    }
  
    const rule = '@good ]'
  
    expect(processMock(mockData, rule)).toBe(-1)
  })

  test('case - 2', () => {
    const mockData = {
      '@good': {
        status: 200
      },
      '@bad': {
        status: 400
      }
    }
  
    const rule = '[ @good'
  
    expect(processMock(mockData, rule)).toBe(-1)
  })
})
