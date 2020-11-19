module.exports = {
  tsconfig: {
    js: {
      include: [
        'packages/*/*/src/js/**/*'    
      ],
    },
    node: {
      include: [
        'packages/*/*/src/node/**/*'    
      ],
    }
  }
}