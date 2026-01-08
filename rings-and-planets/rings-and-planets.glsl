/* * Rings and Planets
 * -----------------
 * A generative celestial visualizer.
 * Credits: Adapted from a collaborative project with tel: https://www.shadertoy.com/view/w3BfWW
 * This version adds color dynamics, adapts and refactors the drawing logic.
 */

// --- Shadertoy Uniforms ---
uniform vec3  iResolution; // viewport resolution (in pixels)
uniform float iTime;       // shader playback time (in seconds)

const int NUM_RINGS = 20;
const int PLANETS_PER_RING = 3;

// A simple hash to keep things "randomly" consistent
uint hash_func(uint x) {
    uint state = x * 747796405u + 2891336453u;
    uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
    return (word >> 22u) ^ word;
}

float get_rand(uint x) {
    return float(hash_func(x)) / 4294967296.0;
}

// Helper to draw a solid circle
float draw_planet(vec2 p, vec2 center, float radius){
    float d = length(p - center);
    return 1.0 - smoothstep(0.0, 0.01, d - radius);
}

// Helper to draw a thin ring outline
float draw_ring(vec2 p, vec2 center, float radius){
    float d = length(p - center);
    float circle_edge = smoothstep(0.0, 0.01, d - radius);
    return circle_edge - smoothstep(0.0, 0.02, d - radius);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Fix coordinates
    vec2 uv = fragCoord / iResolution.xy;
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
   
    // Set up the background colors, make them shift over time
    vec3 color1 = vec3(
        get_rand(12u) * cos(iTime),
        get_rand(32u) * sin(iTime),
        get_rand(42u)) * 0.5;
    vec3 color2 = vec3(
        get_rand(15u) * cos(iTime),
        get_rand(35u) * sin(iTime),
        get_rand(45u)) * 0.5;
    
    float grad_mix = uv.y + sin(iTime * 0.5) * 0.5;
    vec3 bg = mix(color1, color2, clamp(grad_mix, 0.0, 1.0));

    float rings = 0.0;
    float planets = 0.0;
    
    for (int i = 0; i < NUM_RINGS; i++) {
        // Find the "random" center for this specific ring
        float center_x = get_rand(uint(i * 12)) - 0.5;
        float center_y = get_rand(uint(i * 42)) - 0.5;
        vec2 center = 0.05 * vec2(center_x, center_y);
        
        // Make the radius pulse slightly
        float base_r = get_rand(uint(i)) + 0.03;
        float pulse = 0.03 * cos(iTime * (float(i % 3) + 1.0));
        float current_r = base_r + pulse;
    
        rings += draw_ring(p, center, current_r);
        
        // Add the planets for this ring
        for (int j = 1; j <= PLANETS_PER_RING; j++) {
            uint seed = uint(j * (i + 1));
            float p_size = 0.0015 * sqrt(get_rand(seed * 4u));
            
            // Circular motion math
            float angle = get_rand(seed * 3u) * 6.283 + iTime;
            vec2 orbit_pos = current_r * vec2(cos(angle), sin(angle));
            
            planets += draw_planet(p, center + orbit_pos, p_size);
        }
    }
    
    // Combine layers
    vec3 final_col = bg + vec3(rings + planets);
    fragColor = vec4(final_col, 1.0);
}