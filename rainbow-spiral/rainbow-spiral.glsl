// Shadertoy Inputs
uniform vec3  iResolution; // viewport resolution (in pixels)
uniform float iTime;       // shader playback time (in seconds)

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Fix aspect ratio and center the UVs
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    // Grab polar coords
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Constants for easier reading
    float pi = 3.14159;
    float tau = 6.28318;

    // Spiral settings
    float twist = 6.0;
    float speed = 0.8;
    float time = iTime * speed;

    // The "spiral math" - basically finding how far we are from the arm
    float spiral = angle - (twist * dist) - time;
    float armDist = abs(mod(spiral, tau) - pi);

    // Make the line glow. 
    // Dividing by dist + 0.2 keeps the thickness consistent-ish
    float glow = smoothstep(0.1, 0.0, armDist / (dist + 0.2));

    // COLOR TIME: Shift colors based on distance and time
    // This creates a rainbow effect using sin waves
    vec3 rainbow = 0.5 + 0.5 * cos(time + dist * 3.0 + vec3(0, 2, 4));
    
    // Background color (dark navy/grey)
    vec3 bg = vec3(0.02, 0.02, 0.03);

    // Mix it all together
    vec3 finalColor = mix(bg, rainbow, glow);

    // Fade out the edges so it looks cleaner
    finalColor *= (1.0 - smoothstep(0.7, 1.1, dist));

    fragColor = vec4(finalColor, 1.0);
}