module.exports = {
  tsconfig: {
    js: {
      include: [
        'src/js/**/*'    
      ],
      exclude: ['node_modules'],
      compilerOptions: {
        target: 'es5',                          
        module: 'es2020',                     
        strict: true,                         
        esModuleInterop: true,                
        skipLibCheck: true,                   
        forceConsistentCasingInFileNames: true 
      }
    },
    node: {
      include: [
        'src/node/**/*'    
      ],
      exclude: ['node_modules'],
      compilerOptions: {
        target: 'ES2019',                          
        module: 'commonjs',    
        lib: ['ES2019'],                 
        strict: true,                         
        esModuleInterop: true,                
        skipLibCheck: true,                   
        forceConsistentCasingInFileNames: true 
      }
    }
  }
};